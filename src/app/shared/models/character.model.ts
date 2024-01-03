export class Character {

  constructor(
    public id?:       number,
    public name?:     string,
    public status?:   Status,
    public species?:  string,
    public type?:     string,
    public gender?:   Gender,
    public origin?:   Location,
    public location?: Location,
    public image?:    string,
    public episode?:  string[],
    public url?:      string,
    public created?:  Date,
  ) { }
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

export interface Location {
  name: string;
  url:  string;
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
