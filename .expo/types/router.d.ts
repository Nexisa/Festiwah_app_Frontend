/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\components\BlueButton` | `/..\components\Dashboard\Story` | `/_sitemap` | `/admin\dashboard` | `/auth/login` | `/auth/signup` | `/tabs` | `/tabs/explore` | `/tabs/language` | `/tabs\explore` | `/tabs\language` | `/user\` | `/user\_layout` | `/user\comment` | `/user\notify` | `/user\plus` | `/user\profile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
