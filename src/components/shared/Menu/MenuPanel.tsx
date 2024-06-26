import s from './menu.module.scss'
import {cn} from "$lib/utils/Utilities";
import {MaybeChildren, Stylable} from "$lib/utils/UtilTypes";
import {useMenuContext} from "$cmp/shared/Menu/MenuContext";


export function MenuPanelWrapper({children, className, style}: MaybeChildren<Stylable>) {
    const {open, visible} = useMenuContext()

    return <div
        className={cn(
            `${s['side-menu']} ${className}`,
            [open && visible, s['side-menu-open']]
        )}
        style={style}
    >
        {children}
    </div>
}


interface MenuPanelProps<T> {
    title?: string,
    id: T,
}

export function MenuPanel<T>({title, children, id}: MaybeChildren<MenuPanelProps<T>>) {
    const {current} = useMenuContext()
    return <div
        className={cn(
            s["menu-panel"],
            [current === id, s["menu-panel-visible"]]
        )}
    >
        {title &&
            <div className={s["menu-title"]}>
                {title}
            </div>
        }
        <div className={s["panel-content-wrapper"]}>
            {children}
        </div>
    </div>
}