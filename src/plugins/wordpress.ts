/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any */
import qs from 'qs'

export type Context = 'view' | 'embed' | 'edit'
export type Order = 'asc' | 'desc'

export interface GlobalArgs {
  _embed?: boolean;
}

// #region Tag

export interface TagSchema {
  [key: string]: any;
}

export interface TagListArgs extends GlobalArgs {
  context?: Context;

  page?: number;
  per_page?: number;
  offset?: number;

  search?: string;
  exclude?: number[];
  include?: number[];

  order?: Order;
  orderby?: 'id' | 'include' | 'name' | 'slug'
    | 'include_slugs' | 'term_group' | 'description' | 'count';

  hide_empty?: boolean;
  post?: number;
  slug?: string;
}

class TagAPI {
  private wp: Wordpress

  constructor (wp: Wordpress) {
    this.wp = wp
  }

  async list (args?: TagListArgs) {
    const res = await this.wp.get('/tags', args)
    const data = await res.json() as TagSchema[]
    const meta = {
      total: parseInt(res.headers.get('X-WP-Total')!),
      totalPages: parseInt(res.headers.get('X-WP-TotalPages')!)
    }
    return { data, meta }
  }
}

// #endregion

// #region Category

export interface CategorySchema {
  [key: string]: any;
}

export interface CategoryListArgs extends GlobalArgs {
  context?: Context;

  page?: number;
  per_page?: number;
  offset?: number;

  search?: string;
  exclude?: number[];
  include?: number[];

  order?: Order;
  orderby?: 'id' | 'include' | 'name' | 'slug'
    | 'include_slugs' | 'term_group' | 'description' | 'count';

  hide_empty?: boolean;
  parent?: number;
  post?: number;
  slug?: string;
}

class CategoryAPI {
  private wp: Wordpress

  constructor (wp: Wordpress) {
    this.wp = wp
  }

  async list (args?: CategoryListArgs) {
    const res = await this.wp.get('/categories', args)
    const data = await res.json() as CategorySchema[]
    const meta = {
      total: parseInt(res.headers.get('X-WP-Total')!),
      totalPages: parseInt(res.headers.get('X-WP-TotalPages')!)
    }
    return { data, meta }
  }
}

// #endregion

// #region Post

export type PostStatus = 'publish' | 'future' | 'draft' | 'pending'
  | 'private' | 'trash' | 'auto-draft' | 'inherit'
  | 'request-pending' | 'request-confirmed' | 'request-failed' | 'request-completed'
  | 'spam' | 'any'

export interface PostSchema {
  [key: string]: any;
}

export interface PostListArgs extends GlobalArgs {
  context?: Context;

  page?: number;
  per_page?: number;
  offset?: number;

  search?: string;

  before?: string;
  after?: string;

  author?: number[];
  author_exclude?: number[];

  include?: number[];
  exclude?: number[];

  tax_relation?: 'AND' | 'OR';
  categories?: number[];
  categories_exclude?: number[];
  tags?: number[];
  tags_exclude?: number[];

  order?: Order;
  orderby?: 'author' | 'date' | 'id' | 'include'
    | 'modified' | 'parent' | 'relevance' | 'slug'
    | 'include_slugs' | 'title';

  slug?: string[];
  status?: PostStatus[];
  sticky?: boolean;
}

export interface PostRetrieveArgs extends GlobalArgs {
  id?: number;
  context?: Context;
  password?: string;
}

class PostAPI {
  private wp: Wordpress

  constructor (wp: Wordpress) {
    this.wp = wp
  }

  async list (args?: PostListArgs) {
    const res = await this.wp.get('/posts', args)
    const data = await res.json() as PostSchema[]
    const meta = {
      total: parseInt(res.headers.get('X-WP-Total')!),
      totalPages: parseInt(res.headers.get('X-WP-TotalPages')!)
    }
    return { data, meta }
  }

  async get (id: number, args?: PostRetrieveArgs) {
    const res = await this.wp.get('/posts/' + id, args)
    const data = await res.json() as PostSchema
    return { data }
  }

  async getBySlug (slug: string) {
    const { data } = await this.list({ slug: [slug], page: 1, per_page: 1, _embed: true })
    return { data: data[0] }
  }
}

// #endregion

class Wordpress {
  private endpoint: string
  post: PostAPI
  tag: TagAPI
  category: CategoryAPI

  constructor (endpoint: string) {
    this.endpoint = endpoint
    this.post = new PostAPI(this)
    this.tag = new TagAPI(this)
    this.category = new CategoryAPI(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get (path: string, query?: any) {
    path = this.endpoint + path
    if (query) path += '?' + qs.stringify(query)
    const res = await fetch(path)
    if (res.status !== 200) throw new Error((await res.json()).message)
    return res
  }
}

export const wordpress = new Wordpress('https://public-api.wordpress.com/wp/v2/sites/zhangzisu.wordpress.com')
