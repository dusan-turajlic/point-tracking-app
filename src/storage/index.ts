interface NewGame {
    name: string;
    description: string;
    limit: number;
    currentLeader?: string;
    scores: {
        [name: string]: number
    };
}

export const LOCAL_STORAGE_KEY = 'local.games';

export function getGames(): Record<string, NewGame> {
    const currentGames = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (currentGames) {
        const games = JSON.parse(currentGames);
        return Object.fromEntries(
            Object.entries(games).map(([key, value]) => {
                const val = (value as NewGame);
                const [leaderName, leaderScore] = Object.entries(val.scores).sort(([, a], [, b]) => b-a)[0];

                val.currentLeader = `${leaderName} is in the leade ${leaderScore}`;

                return [key, value]
            })
        ) as Record<string, NewGame>
    } else {
        return {};
    }
}

export function getGame(gameName: string): NewGame {
    return getGames()[gameName]
}


export function createGame({name, description, limit, scores}: NewGame) {
    const currentGames = localStorage.getItem(LOCAL_STORAGE_KEY)
    const storeageName = `${name}_${description}`.replace(/[^A-Z0-9]+/ig, "_");
    const storeData = {
        name,
        description,
        limit,
        scores
    }

    if (currentGames) {
        const games = JSON.parse(currentGames)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
            ...games,
            [storeageName]: storeData
        }));
    } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({[storeageName]: storeData}));
    }
}

export function updateGame(gameName: string, score: number, particpant: string) {
    const currentGames = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (currentGames) {
        const games = JSON.parse(currentGames)
        games[gameName].scores[particpant] = score

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));        
    } else {
        throw new Error('No games to update m8')
    }
}

export function deleteGame(gameName: string) {
    const currentGames = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (currentGames) {
        const games = JSON.parse(currentGames)
        delete games[gameName]

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(games));        
    } else {
        throw new Error('No games to delete m8')
    }
}