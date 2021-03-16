import { Agent } from "http";
import Customer from "./customer";

export class Transcript {
    call_id!: String;
    file_url!: String;
    calltype_id!: String;
    call_datetime!: String;
    duration!: Number;
    agent!: Agent[];
    customer!: Customer[];
    script!: any[];
}