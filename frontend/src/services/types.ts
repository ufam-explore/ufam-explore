export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  id: string;
  perfilId: string;
  nome: string;
  email: string;
}

export interface ICreatePostRequest {
  titulo: string;
  texto: string;
  eventoId?: string;
  tags?: string[];
}

export interface IDownvoteResponse {
  id: string;
  usuarioId: string;
  postagemId: string;
}

export interface IUpvoteResponse {
  id: string;
  usuarioId: string;
  postagemId: string;
}


