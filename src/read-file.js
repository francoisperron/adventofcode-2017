import {readFileSync} from "fs";

export const readLines = (file) => (readFileSync(file).toString().split("\n"))
