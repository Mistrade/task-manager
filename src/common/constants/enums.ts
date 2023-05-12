export enum LOADER_TITLES {
  SERVICE_SUSPENSE = 'Пожалуйста, подождите, загружаем сервис...',
}

export enum LS_KEYS {
  'EVENTS' = 'events',
}

export enum ERROR_TYPES {
  ERR_FORBIDDEN = 'ERR_FORBIDDEN',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  ERR_NOT_VALID_RESPONSE = 'ERR_NOT_VALID_RESPONSE',
}

export enum ERROR_DESCRIPTIONS {
  'SUSPENSE' = 'Это может быть связано с нестабильным интернет-соединением или временной неполадкой.\nНе переживайте, мы уже работаем над этим.',
  'PLANNER_RENDER' = 'Во время работы сервиса планирования произошла критическая ошибка. Попробуйте обновить страницу.',
  NAVIGATION_LEFT = 'Воспользуйтесь навигацией слева, для перехода в нужный раздел',
}

export enum ERROR_TITLES {
  'SUSPENSE' = 'Не удалось загрузить запрашиваемый ресурс ленивой загрузки, попробуйте снова, позже...',
  'PLANNER_RENDER' = 'Произошла критическая ошибка',
  NOT_FOUND_URL = 'Вы перешли на неизвестный URL-адрес',
}

export enum PLANNER_LAYOUTS {
  'DAY' = 'day',
  'WEEK' = 'week',
  'MONTH' = 'month',
  'YEAR' = 'year',
  'LIST' = 'list',
  'FAVORITES' = 'favorites',
}

export enum SERVICES_NAMES {
  'PLANNER' = 'planner',
  'FRIENDS' = 'friends',
  'PROFILE' = 'profile',
  'FAQ' = 'faq',
  'SESSION' = 'session',
}

export enum FRIENDS_ROUTES {
  'FRIENDS_LIST' = 'my_friends',
  'OUTGOING_REQUESTS' = 'outgoing',
  'INCOMING_REQUESTS' = 'incoming',
}

export enum CREATE_EVENT_FORM_TABS {
  'INFO' = 'info',
  'MEMBERS' = 'members',
  'CHAINS' = 'chains',
  'ADDITIONAL' = 'additional',
}

export enum EVENT_ACCESS_RIGHTS {
  EDITOR = 'editor',
  VIEW_ONLY = 'viewer',
}

export enum EVENT_INFORMER_TAB_NAMES {
  'ABOUT' = 'about',
  'CHAINS' = 'chains',
  'HISTORY' = 'history',
  'MEMBERS' = 'members',
  'COMMENTS' = 'comments',
  'CHECK_LIST' = 'checkList',
  'VOTES' = 'votes',
}

export enum FRIEND_REQUESTS_TYPES {
  'INCOMING' = 'incoming',
  'OUTGOING' = 'outgoing',
}

export enum FRIEND_REQUEST_ACCEPT_STATUSES {
  'CREATED' = 'created',
  'ACCEPTED' = 'accepted',
  'DECLINE' = 'decline',
}
