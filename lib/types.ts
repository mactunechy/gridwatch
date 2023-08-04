export interface Webhook {
  webhookUrl: string;
  area_name: string;
  id: string;
}

export interface Log {
  timestamp: string;
  responseStatus: number;
  responseData: string;
  requestPayload: string;
}

export interface Area {
  area_name: string;
  area_label: string;
}
