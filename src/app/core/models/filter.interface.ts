import { IParams } from "../../shared/models/http-client.model";

export interface IFilter extends IParams {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
}
