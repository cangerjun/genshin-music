import { SheetFrame } from "$cmp/SheetVisualizer/SheetFrame"
import { useObservableObject } from "$lib/Hooks/useObservable"
import { useTheme } from "$lib/Hooks/useTheme"
import { memo } from "react"
import { playerControlsStore } from "$stores/PlayerControlsStore"




function _PlayerVisualSheetRenderer(){
    const pagesState = useObservableObject(playerControlsStore.pagesState)
    const [theme] = useTheme()
    return <>
    {pagesState.pages.length > 0 &&
        <div className="player-chunks-page">
            {pagesState.currentPage?.map((e, i) =>
                <SheetFrame
                    key={i}
                    theme={theme}
                    selected={i === pagesState.currentChunkIndex}
                    chunk={e}
                    rows={3}
                    hasText={false}
                />
            )}
        </div>
    }
    </>
}
export const PlayerVisualSheetRenderer = memo(_PlayerVisualSheetRenderer, () => true)