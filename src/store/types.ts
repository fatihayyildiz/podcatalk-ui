type User = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
}

type PodcastsPaginationParams = {
    page: number;
    limit: number;
    total: number;
}

type Podcast = {
    id: string;
    content: string;
    status: 'DRAFT' | 'PUBLISHED' | 'INACTIVE';
    title: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

type Persona = {
    persona: string;
    voice: string;
}

type PersonaArray = {
    [key: string]: Persona
}

type PodcastAudioRequestBody = {
    topic: string;
    vibe: string;
    script_text: string;
    voice_personas: string;
}

export type { User, PodcastsPaginationParams, Podcast, PodcastAudioRequestBody, Persona, PersonaArray };