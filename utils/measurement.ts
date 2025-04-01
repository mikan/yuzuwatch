/** Measurement data structure. */
export interface Measurement {
  device_id: string;
  created_at: string;
  received_at: string;
  temp_c?: number;
  hum_p?: number;
  sun_10min?: number;
  moist_v?: number;
}
