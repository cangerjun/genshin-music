import { useTheme } from "lib/Hooks/useTheme";
import { ComposedSong } from "lib/Songs/ComposedSong";
import { RecordedSong } from "lib/Songs/RecordedSong";
import { useEffect, useState } from "react"
import { SongFolder, SongFolderContent } from "./Folder";
import { Folder } from "lib/Folder";
import { SerializedSong, SongType } from "lib/Songs/Song";
import { useFolders } from "lib/Hooks/useFolders";



type SongKinds = SerializedSong | RecordedSong | ComposedSong
interface SongMenuProps<T> {
    songs: SongKinds[],
    SongComponent: Function,
    componentProps: Omit<T, "data">
    className?: string,
    style?: React.CSSProperties,
    baseType?: SongType
    exclude?: SongType[]
}



export function SongMenu<T>({
    songs,
    SongComponent,
    componentProps,
    className,
    style,
    baseType,
    exclude
}: SongMenuProps<T>) {
    const [noFolderRecorded, setNoFolderRecorded] = useState<Folder>()
    const [noFolderComposed, setNoFolderComposed] = useState<Folder>()
    const [filteredSongs, setFilteredSongs] = useState<SongKinds[]>([])
    useEffect(() => {
        setFilteredSongs(songs.filter(s => !exclude?.includes(s.type) ?? true))
    }, [songs, exclude])
    useEffect(() => {
        setNoFolderRecorded(new Folder("Recorded", null, filteredSongs.filter(song => !song.folderId && song.type === 'recorded')))
        setNoFolderComposed(new Folder("Composed", null, filteredSongs.filter(song => !song.folderId && song.type === 'composed')))
    }, [filteredSongs])
    const [folders] = useFolders(filteredSongs)
    const [theme] = useTheme()
    const unselectedColor = theme.layer('menu_background', 0.35).lighten(0.2)

    return <div className={className} style={style}>
        {((!exclude?.includes('recorded') ?? true) && noFolderComposed) &&
            <SongFolder
                backgroundColor={unselectedColor.toString()}
                color={theme.getText('menu_background').toString()}
                data={noFolderComposed}
                isDefault={true}
                defaultOpen={baseType === 'composed'}
            >
                <SongFolderContent>
                    {noFolderComposed.songs.map(song =>
                        <SongComponent
                            {...componentProps}
                            data={song}
                            key={song?.id}
                        />
                    )}
                    {noFolderComposed.songs.length === 0 &&
                        <div style={{ padding: '0.2rem', fontSize: '0.9rem' }}>
                            No songs here, compose one!
                        </div>
                    }
                </SongFolderContent>
            </SongFolder>
        }
        {((!exclude?.includes('recorded') ?? true) && noFolderRecorded) &&
            <SongFolder
                backgroundColor={unselectedColor.toString()}
                color={theme.getText('menu_background').toString()}
                data={noFolderRecorded}
                isDefault={true}
                defaultOpen={baseType === 'recorded'}
            >
                <SongFolderContent>
                    {noFolderRecorded.songs.map(song =>
                        <SongComponent
                            {...componentProps}
                            data={song}
                            key={song?.id}
                        />
                    )}
                    {noFolderRecorded.songs.length === 0 &&
                        <div style={{ padding: '0.2rem', fontSize: '0.9rem' }}>
                            No songs here, record one!
                        </div>
                    }
                </SongFolderContent>
            </SongFolder>
        }
        {folders.map(folder => {
            const composed = folder.songs.filter(song => song.type === 'composed')
            const recorded = folder.songs.filter(song => song.type === 'recorded')
            return <SongFolder
                key={folder.id}
                backgroundColor={unselectedColor.toString()}
                color={theme.getText('menu_background').toString()}
                data={folder}
            >
                {composed.length > 0 &&
                    <SongFolderContent title="Composed">
                        {composed.map(song =>
                            <SongComponent
                                {...componentProps}
                                data={song}
                                key={song?.id}
                            />
                        )}
                    </SongFolderContent>
                }
                {recorded.length > 0 &&
                    <SongFolderContent title="Recorded">
                        {recorded.map(song =>
                            <SongComponent
                                {...componentProps}
                                data={song}
                                key={song?.id}
                            />
                        )}
                    </SongFolderContent>
                }
                {composed.length === 0 && recorded.length === 0 &&
                    <div style={{padding: '0.7rem', paddingTop: "0", fontSize: '0.9rem'}}>
                        The folder is empty
                    </div>
                }
            </SongFolder>
        })}
    </div>
}