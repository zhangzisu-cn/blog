import Butter from 'buttercms'

const APIToken = 'e738131b2fb4e1a0668f2709741ccd8833185e14'

export const butter = Butter(APIToken)

export interface BAuthor {
  slug: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  title: string;
  linkedin_url: string;
  facebook_url: string;
  pinterest_url: string;
  instagram_url: string;
  twitter_handle: string;
  profile_image: string;
}

export interface BCategory {
  slug: string;
  name: string;
}

export interface BTag {
  slug: string;
  name: string;
}

export interface BPost {
  slug: string;
  url: string;
  published: string;
  created: string;
  status: string;
  title: string;
  body: string;
  summary: string;
  seo_title: string;
  meta_description: string;
  author: BAuthor;
  categories: BCategory[];
  tags: BTag[];
  featured_image: string;
  featured_image_alt: string;
}
