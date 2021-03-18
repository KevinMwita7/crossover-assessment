import { Agent } from "./agent";
import Customer from "./customer";
import Script from "./script";
import Transcript from "./transcript";

export class Transcripts {
    call_id: String = "";
    file_url: String = "";
    calltype_id: String = "";
    call_datetime: String = "";
    duration: number = 0;
    agent: Agent[] = [];
    customer: Customer[] = [];
    script: Script[] = [];
    transcript: Transcript[] = [];
}