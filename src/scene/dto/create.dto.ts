import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScreenDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    tag: string

    @IsNotEmpty()
    @IsString()
    imagePath: string

    @IsNotEmpty()
    @IsNumber()
    sceneId: number
}

export class CreateSceneDto {
    @IsNotEmpty()
    @IsString()
    name: string
}