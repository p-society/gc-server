import { Application } from '../declarations';
import users from './users/users.service';
import squad from './squad/squad.service';
import squadPlayer from './squad-player/squad-player.service';
import team from './team/team.service';
import teamPlayer from './team-player/team-player.service';
import admin from './admin/admin.service';
import player from './player/player.service';
import platformSuperAdmin from './platform-super-admin/platform-super-admin.service';
import match from './match/match.service';
import usersVerification from './users/verification/verification.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(squad);
  app.configure(squadPlayer);
  app.configure(team);
  app.configure(teamPlayer);
  app.configure(admin);
  app.configure(player);
  app.configure(platformSuperAdmin);
  app.configure(match);
  app.configure(usersVerification);
}
