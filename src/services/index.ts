import { Application } from '../declarations';

import checkOtpService from './check-otp/check-otp.service';
import sendOtpService from './send-otp/send-otp.service';
import versionService from './version/version.service';
import otpService from './otp/otp.service';
import usersService from './users/users.service';
import banner from './banner/banner.service';
import news from './news/news.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(usersService);
  app.configure(otpService);
  app.configure(checkOtpService);
  app.configure(sendOtpService);
  app.configure(versionService);
  app.configure(banner);
  app.configure(news);
}
