import { Application } from '../declarations';
import users from './users/users.service';
import formFields from './form-fields/form-fields.service';
import formFieldSections from './form-field-sections/form-field-sections.service';
import getForm from './get-form/get-form.service';
import orgGames from './org-games/org-games.service';
import gamesBadminton from './games/badminton/badminton.service';
import gamesList from './games/list/list.service';
import managementTeams from './management/teams/teams.service';
import managementSquads from './management/squads/squads.service';
import managementMatches from './management/matches/matches.service';
import managementCaptainLinkGenerator from './management/captain/link-generator/link-generator.service';
import managementCaptain from './management/captain/captain.service';
import managementTeamsPlayers from './management/teams/players/players.service';
import managementSquadsPlayers from './management/squads/players/players.service';
import tournaments from './tournaments/tournaments.service';
import tournamentTeams from './tournament-teams/tournament-teams.service';
import events from './events/events.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(formFields);
  app.configure(formFieldSections);
  app.configure(getForm);
  app.configure(orgGames);
  app.configure(gamesBadminton);
  app.configure(managementTeams);
  app.configure(managementSquads);
  app.configure(managementMatches);
  app.configure(managementCaptainLinkGenerator);
  app.configure(managementCaptain);
  app.configure(gamesList);
  app.configure(managementTeamsPlayers);
  app.configure(managementSquadsPlayers);
  app.configure(tournaments);
  app.configure(tournamentTeams);
  app.configure(events);
}
