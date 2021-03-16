export default class Call {
    call_id!: String;
    calltype_id!: String;
    agent!: [
      {
        agent_id: String;
        channel_no: Number
      }
    ];
    customer!: [
      {
        full_name: String;
        channel_no: 2
      }
    ];
    call_start_time!: string;
    gs_file_url!: String;
    duration!: Number
}