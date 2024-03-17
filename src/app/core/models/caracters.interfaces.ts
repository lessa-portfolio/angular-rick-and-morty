export class CaractersAPIResponse {
  constructor(public info: Info, public results: Result[]) {}

  static fromJson(jsonData: any): CaractersAPIResponse {
    return new CaractersAPIResponse(
      Info.fromJson(jsonData.info),
      jsonData.results.forEach((result: any) => Result.fromJson(result))
    );
  }
}

export class Info {
  constructor(
    public count: number,
    public pages: number,
    public next: string | null,
    public prev: string | null
  ) {}

  static fromJson(jsonData: any): Info {
    return new Info(
      jsonData.count,
      jsonData.pages,
      jsonData.next || null,
      jsonData.prev || null
    );
  }
}

export class Result {
  constructor(
    public id: number,
    public name: string,
    public status: Status,
    public species: string,
    public type: string,
    public gender: Gender,
    public origin: Location,
    public location: Location,
    public image: string,
    public episode: string[],
    public url: string,
    public created: Date
  ) {}

  static fromJson(jsonData: any): Result {
    return new Result(
      jsonData.id,
      jsonData.name || '',
      jsonData.status,
      jsonData.species || '',
      jsonData.type || '',
      jsonData.gender,
      Location.fromJson(jsonData.origin),
      Location.fromJson(jsonData.location),
      jsonData.image || '',
      jsonData.episode,
      jsonData.url || '',
      new Date(jsonData.created)
    );
  }
}

export class Location {
  constructor(public name: string, public url: string) {}

  static fromJson(jsonData: any): Location {
    return new Location(jsonData.name, jsonData.url);
  }
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'unknown',
}

export enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}
