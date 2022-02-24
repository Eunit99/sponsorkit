import type { SvgComposer } from './svg'

export interface BadgePreset {
  size: number
  boxWidth: number
  boxHeight: number
  displayName: boolean
  sidePadding: number
  textColor?: string
  nameLength?: number
  classes?: string
}

export interface Sponsor {
  type: 'User' | 'Organization'
  login: string
  name: string
  avatarUrl: string
  linkUrl?: string
}

export interface Sponsorship {
  sponsor: Sponsor
  monthlyDollars: number
  privacyLevel: 'PUBLIC' | 'PRIVATE'
  tierName: string
  createdAt: string
  isOneTime: boolean
}

export type OutputFormat = 'svg' | 'png' | 'json'

export interface SponsorkitConfig {
  /**
   * User id of your GitHub account.
   *
   * Will read from `SPONSORKIT_LOGIN` environment variable if not set.
   */
  login?: string
  /**
   * GitHub Token that have access to your sponsorships.
   *
   * Will read from `SPONSORKIT_TOKEN` environment variable if not set.
   *
   * @deprecated It's not recommended set this value directly, pass from env or use `.env` file.
   */
  token?: string

  /**
   * By pass cache
   */
  force?: boolean

  /**
   * Directory of output files.
   *
   * @default './sponsorkit'
   */
  outputDir?: string

  /**
   * Name of exported files
   *
   * @default 'sponsors'
   */
  name?: string

  /**
   * Output formats
   *
   * @default ['json', 'svg', 'png']
   */
  formats?: OutputFormat[]

  /**
   * Hook to modify sponsors data before rendering.
   */
  onSponsorsFetched?: (sponsors: Sponsorship[]) => PromiseLike<void>

  /**
   * Hook to get or modify the SVG before writing.
   */
  onSvgGenerated?: (svg: string) => PromiseLike<string | void | undefined | null>

  /**
   * Compose the SVG
   */
  customComposer?: (composer: SvgComposer, sponsors: Sponsorship[], config: SponsorkitConfig) => PromiseLike<void>

  /**
   * Tiers
   */
  tiers?: Tier[]

  /**
   * Width of the image.
   *
   * @default 700
   */
  width?: number

  /**
   * Path to cache file
   *
   * @default './sponsorkit/.cache.json'
   */
  cacheFile?: string

  /**
   * Padding of image container
   */
  padding?: {
    top?: number
    bottom?: number
  }

  /**
   * Inline CSS of generated SVG
   */
  svgInlineCSS?: string
}

export interface Tier {
  monthlyDollars?: number
  title?: string
  preset?: BadgePreset
  padding?: {
    top?: number
    bottom?: number
  }
  /**
   * Replace the default composer with your own.
   */
  compose?: (composer: SvgComposer, sponsors: Sponsorship[], config: SponsorkitConfig) => PromiseLike<void>
  /**
   * Compose the SVG before the main composer.
   */
  composeBefore?: (composer: SvgComposer, tierSponsors: Sponsorship[], config: SponsorkitConfig) => void
  /**
   * Compose the SVG after the main composer.
   */
  composeAfter?: (composer: SvgComposer, tierSponsors: Sponsorship[], config: SponsorkitConfig) => void
}
