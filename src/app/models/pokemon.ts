import { Type } from './type';
import { Stat } from './stat';
import { Sprite } from './sprite';
import { Ability } from './ability';

export interface Pokemon {
    id: number;
    name: string;
    weight: number;
    height: number;
    types: Type[];
    stats: Stat[];
    sprites: Sprite;
    abilities: Ability[];
    color: string;
}