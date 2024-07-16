import { PartialType } from "@nestjs/mapped-types";
import { CreateSceneDto, CreateScreenDto } from "./create.dto";

export class UpdateSceneDto extends PartialType(CreateSceneDto) {}
export class UpdateScreenDto extends PartialType(CreateScreenDto) {}
