/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/..\components\BlueButton` | `/_sitemap` | `/admin\dashboard` | `/auth/login` | `/auth/signup` | `/tabs` | `/tabs/explore` | `/tabs/language` | `/user\dashboard`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
