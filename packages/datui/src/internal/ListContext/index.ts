import * as React from "react";

/** Index of a direct List child, used as its sortable id. `undefined` outside a List. */
export const ListItemIndexContext = React.createContext<number | undefined>(undefined);
