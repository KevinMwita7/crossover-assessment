import Customer from "./customer";

export default class Call {
    call_id!: String;
    calltype_id!: String;
    agent!: [
      {
        agent_id: String;
        channel_no: Number
      }
    ];
    customer!: Customer[];
    call_start_time!: string;
    gs_file_url!: String;
    duration!: Number
}