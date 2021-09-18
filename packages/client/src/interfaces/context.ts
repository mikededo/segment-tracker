import { Segment, User } from './shared';

export interface AuthState {
  token?: string;
  user?: User;
}

export interface SegmentState {
  segments: Segment[];
  active: Segment | null;
}

export interface UserApiCalls {
  login: (email: string, password: string) => void;
  register: (user: Partial<User>) => void;
}

export interface SegmentApiCalls {
  /**
   * Loads as active segment the selected
   * @param id The id of the segment to load
   */
  getSingle: (id: string) => void;

  /**
   * Loads the segment list with all the segments from the
   * user
   */
  getAll: () => void;

  /**
   * Posts a segment to the current user
   * @param segment The segment to post
   */
  post: (segment: Segment) => void;

  /**
   * Updates the segment with the given id fields of the given segment
   * @param id The id of the segment to patch
   * @param segment The segment data to patch
   */
  patch: (id: string, segment: Partial<Segment>) => void;

  /**
   * Deletes the segment with the given id
   * @param id The id of the segment to delete
   */
  delete: (id: string) => void;
}

export interface ApiCalls {
  user: UserApiCalls;
  segments: SegmentApiCalls;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export interface ApiState {
  loading: boolean;
  error?: ApiError;
  errorDismised: boolean;
}

type ClearApiError = {
  clearError: () => void;
};

type ClearActiveSegment = {
  clearActive: () => void;
};

export interface AppContext {
  auth: Readonly<AuthState>;
  api: Readonly<ApiState & ApiCalls & ClearApiError>;
  segments: Readonly<SegmentState & ClearActiveSegment>;
}
