export abstract class ICacheService {
  get: (key: string) => Promise<string | undefined>;
}
