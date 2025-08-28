import createProvider from "../services/providers";

export interface NewGame {
    id: string;
    name: string;
    description: string;
    limit: number;
    currentLeader?: string;
    scores: {
        [name: string]: {score: number}
    };
}

type CreateNewGame = Omit<NewGame, 'id'>;

const provider = createProvider('indexDB')
const GAME_PATH = 'games';

async function oldFormatToNewFormatMigration() {
    const games = localStorage.getItem('local.games');
    const hasMigrated = localStorage.getItem('local.games.migrated');
    if (hasMigrated) {
        return;
    }

    if (games) {
        const newGames = JSON.parse(games);
        Object.entries(newGames).forEach(async ([, value]) => {
            const val = (value as CreateNewGame);
            await createGame({
                ...val, 
                scores: Object.fromEntries(
                    Object.entries(val.scores).map(([key, value]) => [key, {score: value}])
                ) as unknown as CreateNewGame['scores']
            });
        })
    }

    localStorage.setItem('local.games.migrated', 'true');
}

oldFormatToNewFormatMigration();

export async function getGames(): Promise<Record<string, NewGame>> {
    const games = await provider.get<Record<string, NewGame>>(GAME_PATH)
        .catch(() => ({}))

    return Object.fromEntries(
        Object.entries(games).map(([key, value]) => {
            const val = (value as NewGame);
            const [leaderName, leaderScore] = Object.entries(val.scores).sort(([, a], [, b]) => b.score-a.score)[0];

            val.currentLeader = `${leaderName} is in the lead with ${leaderScore.score} points`;

            return [key, val]
        })
    );
}

export async function getGame(gameId: string): Promise<NewGame> {
    return await provider.get<NewGame>(`${GAME_PATH}/${gameId}`);
}


export async function createGame({name, description, limit, scores}: CreateNewGame) {
    return await provider.create(GAME_PATH, {
        name,
        description,
        limit,
        scores
    })
}

export async function updateGameDetails(gameId: string, {name, description, limit, scores}: CreateNewGame) {
    return provider.update(`${GAME_PATH}/${gameId}`, {
        name,
        description,
        limit,
        scores
    })
}

export async function updateGame(gameId: string, score: number, particpantId: string) {
    const game = await getGame(gameId);
    await provider.update(`${GAME_PATH}/${gameId}`, {
        scores: {
            ...game.scores,
            [particpantId]: {score}
        }
    })
}

export async function deleteGame(gameId: string) {
    return await provider.delete(`${GAME_PATH}/${gameId}`)
}