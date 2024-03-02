import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import { Request } from "express"
import { Application } from './declarations';
import logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import { HookContext as FeathersHookContext } from '@feathersjs/feathers';
import authentication from './authentication';
import mongoose from './mongoose';
import { generateJWT } from './middleware/generateJwt';
import { decodeJWT } from './middleware/decodeJwt';
import { extractTokenFromHeader } from './utils/extractTokenFromHeader';
import sendMail from './utils/sendMail';
import generateOtp from './utils/generateOtp';
import { Service } from 'feathers-mongoose';
// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());
export type HookContext<T = any> = { app: Application } & FeathersHookContext<T>;

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.ts`)

// @ts-ignore
app.post("/players", async (req, res) => {
  try {
    const player = req.body;
    const OTP = generateOtp();

    await sendMail(player.email, OTP);

    const verificationToken = generateJWT(player, app, OTP);

    res.json({ verificationToken });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

app.post("/players/callback/verification", async (req: Request, res: Response): Promise<any> => {
  try {
    const { otp: typedOtp } = req.body;
    const token = extractTokenFromHeader(req)
    if (!token) {
      // @ts-ignore
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const { player ,otp} = decodeJWT(token, app)
    console.log("player = ", player)
    if (otp === typedOtp) {
      const PlayerService: Service = app.service('players')

      const playerData = new PlayerService.Model({
        email: player.email,
        password: player.password,
      })
      const savedPlayer = await playerData.save()
      console.log("correct")
      // @ts-ignore
      return res.status(200).json({ ...savedPlayer });
    } else {
      console.log("Invalid OTP")
      // @ts-ignore
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (e: any) {
    console.error('Error:', e.message);
    // @ts-ignore
    return res.status(500).json({ error: 'Internal server error' });
  }
})


app.configure(services);

// Set up event channels (see channels.ts)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

app.hooks(appHooks);

export default app;
