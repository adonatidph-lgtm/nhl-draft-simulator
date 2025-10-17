import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Share2, Users, Trophy } from 'lucide-react';

const App = () => {
  const [draftPicks, setDraftPicks] = useState([]);
  const [currentPick, setCurrentPick] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [draftStarted, setDraftStarted] = useState(false);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [filterPosition, setFilterPosition] = useState('ALL');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRankings, setShowRankings] = useState(false);
  const [customRankings, setCustomRankings] = useState([]);

  const teams = [
    { id: 1, name: 'Anaheim Ducks', abbr: 'ANA', color: '#F47A38' },
    { id: 2, name: 'Utah Hockey Club', abbr: 'UTA', color: '#69B3E7' },
    { id: 3, name: 'Chicago Blackhawks', abbr: 'CHI', color: '#CF0A2C' },
    { id: 4, name: 'San Jose Sharks', abbr: 'SJS', color: '#006D75' },
    { id: 5, name: 'Montreal Canadiens', abbr: 'MTL', color: '#AF1E2D' },
    { id: 6, name: 'Columbus Blue Jackets', abbr: 'CBJ', color: '#002654' },
    { id: 7, name: 'Ottawa Senators', abbr: 'OTT', color: '#C52032' },
    { id: 8, name: 'Seattle Kraken', abbr: 'SEA', color: '#99D9D9' },
    { id: 9, name: 'Calgary Flames', abbr: 'CGY', color: '#D2001C' },
    { id: 10, name: 'New Jersey Devils', abbr: 'NJD', color: '#CE1126' },
    { id: 11, name: 'Buffalo Sabres', abbr: 'BUF', color: '#002654' },
    { id: 12, name: 'Philadelphia Flyers', abbr: 'PHI', color: '#F74902' },
    { id: 13, name: 'Minnesota Wild', abbr: 'MIN', color: '#154734' },
    { id: 14, name: 'St. Louis Blues', abbr: 'STL', color: '#002F87' },
    { id: 15, name: 'Detroit Red Wings', abbr: 'DET', color: '#CE1126' },
    { id: 16, name: 'New York Islanders', abbr: 'NYI', color: '#00539B' },
    { id: 17, name: 'Pittsburgh Penguins', abbr: 'PIT', color: '#000000' },
    { id: 18, name: 'Nashville Predators', abbr: 'NSH', color: '#FFB81C' },
    { id: 19, name: 'Boston Bruins', abbr: 'BOS', color: '#FFB81C' },
    { id: 20, name: 'Los Angeles Kings', abbr: 'LAK', color: '#111111' },
    { id: 21, name: 'Tampa Bay Lightning', abbr: 'TBL', color: '#002868' },
    { id: 22, name: 'Washington Capitals', abbr: 'WSH', color: '#041E42' },
    { id: 23, name: 'Vegas Golden Knights', abbr: 'VGK', color: '#B4975A' },
    { id: 24, name: 'Carolina Hurricanes', abbr: 'CAR', color: '#CE1126' },
    { id: 25, name: 'Toronto Maple Leafs', abbr: 'TOR', color: '#00205B' },
    { id: 26, name: 'Colorado Avalanche', abbr: 'COL', color: '#6F263D' },
    { id: 27, name: 'Dallas Stars', abbr: 'DAL', color: '#006847' },
    { id: 28, name: 'Edmonton Oilers', abbr: 'EDM', color: '#041E42' },
    { id: 29, name: 'Florida Panthers', abbr: 'FLA', color: '#041E42' },
    { id: 30, name: 'New York Rangers', abbr: 'NYR', color: '#0038A8' },
    { id: 31, name: 'Vancouver Canucks', abbr: 'VAN', color: '#00205B' },
    { id: 32, name: 'Winnipeg Jets', abbr: 'WPG', color: '#041E42' },
  ];

  const defaultProspects = [
    { id: 1, name: 'Gavin McKenna', pos: 'LW', team: 'Penn State', rank: 1, height: '6\'0"', weight: 165 },
    { id: 2, name: 'Keaton Verhoeff', pos: 'D', team: 'North Dakota', rank: 2, height: '6\'4"', weight: 212 },
    { id: 3, name: 'Tynan Lawrence', pos: 'C', team: 'Muskegon', rank: 3, height: '6\'1"', weight: 185 },
    { id: 4, name: 'Ivar Stenberg', pos: 'LW', team: 'Frölunda HC', rank: 4, height: '6\'0"', weight: 181 },
    { id: 5, name: 'Ryan Roobroeck', pos: 'LW', team: 'Niagara', rank: 5, height: '6\'4"', weight: 216 },
    { id: 6, name: 'Ethan Belchetz', pos: 'LW', team: 'Windsor', rank: 6, height: '6\'2"', weight: 190 },
    { id: 7, name: 'Mathis Preston', pos: 'C', team: 'Spokane', rank: 7, height: '6\'1"', weight: 183 },
    { id: 8, name: 'Jackson Dorrington', pos: 'D', team: 'Mississauga', rank: 8, height: '6\'0"', weight: 185 },
    { id: 9, name: 'Viggo Björck', pos: 'C', team: 'Djurgårdens IF', rank: 9, height: '6\'0"', weight: 176 },
    { id: 10, name: 'Adam Novotný', pos: 'RW', team: 'Peterborough', rank: 10, height: '6\'0"', weight: 183 },
    { id: 11, name: 'Ryan Lin', pos: 'D', team: 'Vancouver', rank: 11, height: '6\'1"', weight: 181 },
    { id: 12, name: 'Cooper Connell', pos: 'LW', team: 'Kingston', rank: 12, height: '5\'11"', weight: 181 },
    { id: 13, name: 'Drew Greer', pos: 'D', team: 'London', rank: 13, height: '6\'3"', weight: 207 },
    { id: 14, name: 'Bobby Sallows', pos: 'C', team: 'Waterloo', rank: 14, height: '5\'11"', weight: 181 },
    { id: 15, name: 'Luke Osburn', pos: 'D', team: 'Kelowna', rank: 15, height: '6\'2"', weight: 190 },
    { id: 16, name: 'Marek Vanacker', pos: 'LW', team: 'Brantford', rank: 16, height: '5\'10"', weight: 174 },
    { id: 17, name: 'Lev Katzin', pos: 'C', team: 'Cornell', rank: 17, height: '6\'0"', weight: 181 },
    { id: 18, name: 'Viktor Wennberg', pos: 'D', team: 'Djurgårdens IF', rank: 18, height: '6\'3"', weight: 194 },
    { id: 19, name: 'Graham Sward', pos: 'D', team: 'London', rank: 19, height: '6\'3"', weight: 205 },
    { id: 20, name: 'Cameron Reid', pos: 'C', team: 'Kitchener', rank: 20, height: '6\'1"', weight: 194 },
    { id: 21, name: 'Brady Stonehouse', pos: 'LW', team: 'Vancouver', rank: 21, height: '6\'2"', weight: 201 },
    { id: 22, name: 'Marcus Gidlöf', pos: 'D', team: 'Leksands IF', rank: 22, height: '6\'2"', weight: 185 },
    { id: 23, name: 'Nate Corbet', pos: 'D', team: 'Tri-City', rank: 23, height: '6\'4"', weight: 212 },
    { id: 24, name: 'Blake Fiddler', pos: 'D', team: 'Lethbridge', rank: 24, height: '6\'2"', weight: 183 },
    { id: 25, name: 'Owen Conrad', pos: 'LW', team: 'Peterborough', rank: 25, height: '6\'1"', weight: 194 },
    { id: 26, name: 'Ondrej Kos', pos: 'D', team: 'Brampton', rank: 26, height: '6\'2"', weight: 194 },
    { id: 27, name: 'Max Plante', pos: 'C', team: 'Cedar Rapids', rank: 27, height: '6\'0"', weight: 181 },
    { id: 28, name: 'Ben Kevan', pos: 'D', team: 'Portland', rank: 28, height: '6\'3"', weight: 198 },
    { id: 29, name: 'Ben Baumgartner', pos: 'RW', team: 'USNTDP', rank: 29, height: '6\'1"', weight: 185 },
    { id: 30, name: 'William Zellers', pos: 'C', team: 'USNTDP', rank: 30, height: '5\'10"', weight: 165 },
    { id: 31, name: 'Victor Eklund', pos: 'C', team: 'Djurgårdens IF', rank: 31, height: '5\'11"', weight: 172 },
    { id: 32, name: 'Jack Murtagh', pos: 'RW', team: 'USNTDP', rank: 32, height: '6\'1"', weight: 187 },
  ];

  useEffect(() => {
    setAvailablePlayers(defaultProspects);
    setCustomRankings(defaultProspects);
  }, []);

  const startDraft = (team) => {
    setSelectedTeam(team);
    setDraftStarted(true);
  };

  const startAllTeamsDraft = () => {
    setSelectedTeam({ id: 0, name: 'All Teams', abbr: 'ALL' });
    setDraftStarted(true);
  };

  const makePick = (player) => {
    const pickingTeam = teams[currentPick - 1];
    const newPick = {
      pick: currentPick,
      team: pickingTeam,
      player: player,
      userPick: selectedTeam.id === 0 || pickingTeam.id === selectedTeam.id
    };
    
    setDraftPicks([...draftPicks, newPick]);
    setAvailablePlayers(availablePlayers.filter(p => p.id !== player.id));
    setCurrentPick(currentPick + 1);
  };

  const resetDraft = () => {
    setDraftPicks([]);
    setCurrentPick(1);
    setSelectedTeam(null);
    setDraftStarted(false);
    setAvailablePlayers(customRankings.length > 0 ? customRankings : defaultProspects);
    setFilterPosition('ALL');
  };

  const generateShareText = () => {
    let text = '🏒 My 2026 NHL Mock Draft - The Prospect Don\n\n';
    draftPicks.forEach(pick => {
      text += `${pick.pick}. ${pick.team.abbr} - ${pick.player.name} (${pick.player.pos})\n`;
    });
    text += '\nCreate your own at Claude.ai';
    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateShareText());
    alert('Draft copied to clipboard!');
  };

  const movePlayerUp = (index) => {
    if (index === 0) return;
    const newRankings = [...customRankings];
    [newRankings[index], newRankings[index - 1]] = [newRankings[index - 1], newRankings[index]];
    newRankings.forEach((player, idx) => {
      player.rank = idx + 1;
    });
    setCustomRankings(newRankings);
    setAvailablePlayers(newRankings.filter(p => !draftPicks.some(pick => pick.player.id === p.id)));
  };

  const movePlayerDown = (index) => {
    if (index === customRankings.length - 1) return;
    const newRankings = [...customRankings];
    [newRankings[index], newRankings[index + 1]] = [newRankings[index + 1], newRankings[index]];
    newRankings.forEach((player, idx) => {
      player.rank = idx + 1;
    });
    setCustomRankings(newRankings);
    setAvailablePlayers(newRankings.filter(p => !draftPicks.some(pick => pick.player.id === p.id)));
  };

  const applyRankings = () => {
    setAvailablePlayers(customRankings);
    setShowRankings(false);
  };

  const filteredPlayers = filterPosition === 'ALL' 
    ? availablePlayers 
    : availablePlayers.filter(p => p.pos === filterPosition);

  const currentPickTeam = teams[currentPick - 1];
  const isUserTurn = selectedTeam && (selectedTeam.id === 0 || currentPickTeam?.id === selectedTeam.id);

  if (!draftStarted) {
    return (
      <div className="min-h-screen bg-black">
        <div className="bg-gradient-to-r from-red-900 via-black to-red-900 border-b-4 border-red-600">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <Trophy className="text-white" size={32} />
              </div>
              <div className="text-center">
                <h1 className="text-5xl font-black text-white tracking-tight">
                  THE PROSPECT DON
                </h1>
                <p className="text-red-400 text-sm font-bold uppercase tracking-widest mt-1">
                  Draft Prospects Hockey
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">2026 NHL Mock Draft Simulator</h2>
            <p className="text-xl text-gray-400 mb-2">AN INDEPENDENT SCOUTING SERVICE</p>
            <p className="text-lg text-red-500 font-semibold">Select Your Team to Begin</p>
          </div>

          <div className="max-w-7xl mx-auto mb-8 flex justify-center gap-4 flex-wrap">
            <button
              onClick={startAllTeamsDraft}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 flex items-center gap-2 shadow-xl border-2 border-red-500"
            >
              <Users size={24} />
              Draft for All 32 Teams
            </button>
            <button
              onClick={() => setShowRankings(true)}
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-xl border-2 border-gray-700"
            >
              Create Custom Rankings
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {teams.map(team => (
              <button
                key={team.id}
                onClick={() => startDraft(team)}
                className="bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white p-6 rounded-lg transition-all transform hover:scale-105 border-2 border-gray-800 hover:border-red-600 shadow-lg"
              >
                <div className="text-3xl font-black mb-2 text-red-500">{team.abbr}</div>
                <div className="text-sm text-gray-300 font-semibold">{team.name}</div>
                <div className="text-xs text-gray-500 mt-2 font-bold">PICK #{team.id}</div>
              </button>
            ))}
          </div>
        </div>

        {showRankings && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden border-2 border-red-600 shadow-2xl">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase">Create Your Rankings</h2>
                <button onClick={() => setShowRankings(false)} className="text-3xl hover:text-gray-200">&times;</button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh] bg-black">
                {customRankings.map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between py-3 border-b border-gray-800 hover:bg-gray-900">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-2xl font-black text-red-500 w-10">{index + 1}</span>
                      <div>
                        <div className="font-bold text-white text-lg">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.pos} • {player.team}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => movePlayerUp(index)}
                        disabled={index === 0}
                        className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-700 hover:bg-red-700 font-bold"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => movePlayerDown(index)}
                        disabled={index === customRankings.length - 1}
                        className="px-4 py-2 bg-red-600 text-white rounded disabled:bg-gray-700 hover:bg-red-700 font-bold"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-900 flex justify-end gap-4 border-t-2 border-gray-800">
                <button
                  onClick={() => {
                    setCustomRankings(defaultProspects);
                    setShowRankings(false);
                  }}
                  className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 font-bold"
                >
                  Reset to Default
                </button>
                <button
                  onClick={applyRankings}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold"
                >
                  Apply Rankings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-gradient-to-r from-red-900 via-black to-red-900 text-white py-3 px-6 shadow-lg border-b-4 border-red-600">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center border-2 border-white">
              <Trophy className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">THE PROSPECT DON</h1>
              <p className="text-xs text-red-400 font-semibold">
                {selectedTeam.id === 0 ? 'Drafting for All Teams' : selectedTeam.name}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-bold transition flex items-center gap-2 border-2 border-red-500"
            >
              <Share2 size={16} />
              Share
            </button>
            <button
              onClick={resetDraft}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm font-bold transition border-2 border-gray-700"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {currentPick <= 32 && (
        <div className={`${isUserTurn ? 'bg-gradient-to-r from-green-700 to-green-600' : 'bg-gradient-to-r from-red-700 to-red-600'} text-white py-4 px-6 border-b-2 ${isUserTurn ? 'border-green-500' : 'border-red-500'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Pick #{currentPick} - Round 1</div>
                <div className="text-3xl font-black">{currentPickTeam.name} {isUserTurn && '- ON THE CLOCK!'}</div>
              </div>
              {selectedTeam.id === 0 && (
                <button
                  onClick={() => makePick(availablePlayers[0])}
                  className="bg-white text-black px-6 py-3 rounded font-black hover:bg-gray-200 transition shadow-lg"
                >
                  AUTO PICK
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg shadow-2xl border-2 border-gray-800">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-lg border-b-2 border-red-500">
                <h2 className="text-2xl font-black uppercase">Available Prospects</h2>
              </div>
              
              <div className="px-6 py-4 border-b border-gray-800 flex gap-2 bg-black">
                {['ALL', 'C', 'LW', 'RW', 'D', 'G'].map(pos => (
                  <button
                    key={pos}
                    onClick={() => setFilterPosition(pos)}
                    className={`px-4 py-2 rounded font-bold text-sm transition ${
                      filterPosition === pos
                        ? 'bg-red-600 text-white border-2 border-red-500'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-gray-700'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto bg-black">
                {filteredPlayers.map(player => (
                  <div
                    key={player.id}
                    className={`px-6 py-4 hover:bg-gray-900 transition ${
                      isUserTurn ? 'cursor-pointer hover:border-l-4 hover:border-red-600' : ''
                    }`}
                    onClick={() => isUserTurn && makePick(player)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-black text-red-500 w-12">#{player.rank}</div>
                        <div>
                          <div className="font-black text-xl text-white">{player.name}</div>
                          <div className="text-sm text-gray-400 font-semibold">{player.team}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-red-500 text-lg">{player.pos}</div>
                        <div className="text-xs text-gray-500 font-semibold">{player.height} • {player.weight} lbs</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg shadow-2xl sticky top-6 border-2 border-gray-800">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-lg border-b-2 border-red-500">
                <h2 className="text-xl font-black uppercase">Draft Results</h2>
              </div>
              <div className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto bg-black">
                {draftPicks.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500 font-semibold">
                    No picks yet
                  </div>
                ) : (
                  draftPicks.map(pick => (
                    <div
                      key={pick.pick}
                      className={`px-4 py-3 ${pick.userPick ? 'bg-green-900 bg-opacity-30 border-l-4 border-green-500' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="font-black text-red-500 text-sm">{pick.pick}.</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-sm truncate text-white">{pick.team.abbr}</div>
                          <div className="font-bold text-xs text-red-400 truncate">
                            {pick.player.name}
                          </div>
                          <div className="text-xs text-gray-500">{pick.player.pos} • {pick.player.team}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {currentPick > 32 && (
                <div className="px-6 py-4 bg-gray-900 rounded-b-lg text-center border-t-2 border-gray-800">
                  <div className="text-lg font-bold text-white mb-2">Draft Complete!</div>
                  <button
                    onClick={resetDraft}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition"
                  >
                    Start New Draft
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full border-2 border-red-600 shadow-2xl">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-2xl font-black uppercase">Share Your Mock Draft</h2>
              <button onClick={() => setShowShareModal(false)} className="text-3xl hover:text-gray-200">&times;</button>
            </div>
            <div className="p-6 bg-black">
              <textarea
                value={generateShareText()}
                readOnly
                className="w-full h-96 p-4 border-2 border-gray-700 rounded font-mono text-sm bg-gray-900 text-white"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={copyToClipboard}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold transition"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;