import { SetMetadata } from "@nestjs/common";

export const Protected = (isProtected: boolean) =>
    SetMetadata('istrue', isProtected)