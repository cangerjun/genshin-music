import {SPEED_CHANGERS} from "$config"
import {MemoizedIcon} from "$cmp/shared/Utility/Memoized";
import {FaStop, FaSyncAlt} from "react-icons/fa";
import {ChangeEvent, memo} from "react";
import {playerStore} from "$stores/PlayerStore";
import {playerControlsStore} from "$stores/PlayerControlsStore";
import {hasTooltip, Tooltip} from '$cmp/shared/Utility/Tooltip'
import {IconButton} from "$cmp/shared/Inputs/IconButton";
import {useObservableObject} from "$lib/Hooks/useObservable";
import {GiMetronome} from "react-icons/gi";
import {AppButton} from "$cmp/shared/Inputs/AppButton";
import {PlayerSlider} from "./PlayerSlider";
import {PlayerVisualSheetRenderer} from "./PlayerPagesRenderer";
import s from './Slider.module.css'
import svs from './VisualSheet.module.css'
import {useTranslation} from "react-i18next";

interface PlayerSongControlsProps {
    onRestart: () => void
    onRawSpeedChange: (event: ChangeEvent<HTMLSelectElement>) => void
    onToggleRecordAudio: (override: boolean) => void
    onToggleMetronome: () => void
    speedChanger: typeof SPEED_CHANGERS[number]
    isVisualSheetVisible: boolean
    hasSong: boolean
    isMetronomePlaying: boolean
    isRecordingAudio: boolean
}

function _PlayerSongControls({
                                 onRestart,
                                 onRawSpeedChange,
                                 speedChanger,
                                 hasSong,
                                 isMetronomePlaying,
                                 onToggleMetronome,
                                 isRecordingAudio,
                                 onToggleRecordAudio,
                                 isVisualSheetVisible
                             }: PlayerSongControlsProps) {
    const songData = useObservableObject(playerStore.state)
    const {t} = useTranslation(["player", 'common', "settings"])
    return <>
        {songData.eventType === 'approaching' &&
            <Score/>
        }
        <div className={`column ${svs['player-controls']}`}>
            {/*this div is here to keep an empty element to keep the styling consistent */}
            <div>
                {songData.eventType !== 'approaching' &&
                    <AppButton
                        toggled={isRecordingAudio}
                        onClick={() => onToggleRecordAudio(!isRecordingAudio)}
                    >
                        {isRecordingAudio ? t('finish_recording') : t("record_audio")}
                    </AppButton>
                }
            </div>
            <div className={`column ${s['slider-wrapper']}`} style={!hasSong ? {display: 'none'} : {}}>
                <div className="row" style={{width: '100%'}}>
                    <div className={`${hasTooltip(true)} row`} style={{marginRight: '0.4rem', flex: 1}}>
                        <select
                            className={s['slider-select']}
                            onChange={onRawSpeedChange}
                            value={speedChanger.name}
                            style={{backgroundImage: 'none'}}
                        >
                            <option disabled>Speed</option>
                            {SPEED_CHANGERS.map(e => {
                                return <option value={e.name} key={e.name}>
                                    {e.name}
                                </option>
                            })}
                        </select>
                        <Tooltip position="left">
                            {t('change_speed')}
                        </Tooltip>
                    </div>
                    <IconButton
                        onClick={() => {
                            playerStore.resetSong()
                            playerControlsStore.clearPages()
                            playerControlsStore.resetScore()
                        }}
                        style={{flex: 1}}
                        tooltip={t('common:stop')}
                        ariaLabel={t("stop_song")}
                    >
                        <MemoizedIcon icon={FaStop}/>
                    </IconButton>
                </div>
                <PlayerSlider/>

                <IconButton onClick={onRestart} tooltip='Restart' ariaLabel="Restart song">
                    <MemoizedIcon icon={FaSyncAlt}/>
                </IconButton>
            </div>

            <IconButton
                toggled={isMetronomePlaying}
                onClick={onToggleMetronome}
                className='metronome-button'
                ariaLabel={t('settings:toggle_metronome')}
            >
                <GiMetronome size={22}/>
            </IconButton>
        </div>
        {isVisualSheetVisible &&
            <PlayerVisualSheetRenderer/>
        }
    </>
}

export const PlayerSongControls = memo(_PlayerSongControls, (prev, next) => {
    return prev.speedChanger === next.speedChanger && prev.hasSong === next.hasSong && prev.isMetronomePlaying === next.isMetronomePlaying
        && prev.isRecordingAudio === next.isRecordingAudio && prev.isVisualSheetVisible === next.isVisualSheetVisible
})


function _Score() {
    const {t } = useTranslation("player")
    const {combo, score, correct, wrong} = useObservableObject(playerControlsStore.score)
    return <div className='approaching-accuracy'>
        <table>
            <tbody>
            <tr>
                <td className='sc-2'>{t("accuracy")}</td>
                <td className='sc-1'>{(correct / (correct + wrong - 1) * 100).toFixed(1)}%</td>
            </tr>
            <tr>
                <td className='sc-2'>{t("score")}</td>
                <td className='sc-1'>{score}</td>
            </tr>
            <tr>
                <td className='sc-2'>{t("combo")}</td>
                <td className='sc-1'>{combo}</td>
            </tr>
            </tbody>
        </table>
    </div>
}

const Score = memo(_Score, () => true)