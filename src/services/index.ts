import { Application } from '../declarations';

import checkOtpService from './check-otp/check-otp.service';
import sendOtpService from './send-otp/send-otp.service';
import versionService from './version/version.service';
import otpService from './otp/otp.service';
import usersService from './users/users.service';
<<<<<<< HEAD
import team from './team/team.service';
import teamPlayer from './team-player/team-player.service';
import squad from './squad/squad.service';
import squadPlayer from './squad-player/squad-player.service';
=======
import banner from './banner/banner.service';
import news from './news/news.service';
>>>>>>> 3333fdab6d7a8a1ac0af33c21ba17a521a82b173
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(usersService);
  app.configure(otpService);
  app.configure(checkOtpService);
  app.configure(sendOtpService);
  app.configure(versionService);
<<<<<<< HEAD
  app.configure(team);
  app.configure(teamPlayer);
  app.configure(squad);
  app.configure(squadPlayer);
=======
  app.configure(banner);
  app.configure(news);
>>>>>>> 3333fdab6d7a8a1ac0af33c21ba17a521a82b173
}
