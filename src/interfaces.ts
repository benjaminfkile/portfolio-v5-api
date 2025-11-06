import { TNodeEnviromnent } from "./types";

export interface IAPISecrets {
  db_username: string;
  db_password: string;
  db_engine: string;
  db_proxy_url: string;
  db_host: string;
  db_port: number;
  db_dbInstanceIdentifier: string;
  db_name: string;
  aws_access_key_id: string;
  aws_secret_access_key: string;
  aws_region: string;
  node_env: TNodeEnviromnent;
  port: string;
  s3_bucket_name: string
}

export interface IDBSecrets {
  username: string
  password: string
  engine: "postgres"
  host: string
  proxy_url: string
  port: 5432
  dbInstanceIdentifier: string
}

export interface IDBHealth {
  connected: boolean;
  connectionUsesProxy: boolean;
  logs?: {
    messages: string[];
    host?: string;
    timestamp: string;
    error?: string;
  };
}

export interface IContentResponse {
  about: string;
  portfolioItems: IPortfolioItem[];
  skillItems: ISkillItem[];
  timelineItems: ITimelineItem[];
}

export interface IPortfolioItem {
  id: number;
  title: string;
  intro: string;
  description: string;
  file_name: string;
  order: number;
  url: string | null;
  repo: string | null;
  media_type: number;
  playbackRate: number;
  transform_value: string;
  tech_icon_arry: string[];
}

export interface ISkillItem {
  id: number;
  icon_source: string;
  title: string;
  description: string;
  proficiency: number;
  order: number;
}

export interface ITimelineItem {
  id: number;
  date_range: string;
  title: string;
  description: string;
  img_title: string;
  order: number;
}

export interface IRawSQL {
  command: string;
  rowCount: number;
  oid: null | string;
  rows: any[];
}
