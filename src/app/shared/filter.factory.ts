import { Info } from '../interfaces/caracters.interfaces';
import { Filter } from './../interfaces/filters.interface';

export function newFilter(): Filter {
  return {
    name:   [],
    status: [],
    species:[],
    type:   [],
    gender: [],
    origin: [],
    location: []
  }
}

export function newInfo(): Info {
  return {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  }
}
