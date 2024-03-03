import { Application } from '../declarations';
import player from './player/player.service';
import playerVerification from './player/verification/verification.service';
import platformSuperAdmin from './platform-super-admin/platform-super-admin.service';
import squad from './squad/squad.service';
import squadPlayer from './squad-player/squad-player.service';
import team from './team/team.service';
import teamPlayer from './team-player/team-player.service';
import match from './match/match.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(player);
  app.configure(playerVerification);
  app.configure(platformSuperAdmin);
  app.configure(squad);
  app.configure(squadPlayer);
  app.configure(team);
  app.configure(teamPlayer);
  app.configure(match);
}
