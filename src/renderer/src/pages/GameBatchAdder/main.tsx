import { cn } from '~/utils'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { toast } from 'sonner'
import { useGameBatchAdderStore } from './store'
import { GameList } from './GameList'
import { useTranslation } from 'react-i18next'
import { useConfigLocalState } from '~/hooks'

export function GameBatchAdder(): React.JSX.Element {
  const { t } = useTranslation('adder')
  const {
    isOpen,
    isLoading,
    upscaleScale,
    actions: { setIsOpen, setGames, setIsLoading, setUpscaleScale }
  } = useGameBatchAdderStore()

  const [upscalerPath] = useConfigLocalState('game.linkage.upscaler.path')
  const isUpscalerConfigured = !!upscalerPath

  const handleClose = (): void => {
    if (isLoading) {
      toast.warning(t('gameBatchAdder.dialog.waitForCompletion'))
      return
    }

    setIsOpen(false)
    setGames([])
    setIsLoading(false)
    setUpscaleScale(0)
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className={cn('w-auto h-auto max-w-none flex flex-col gap-5')}
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
        onClose={handleClose}
      >
        <GameList />
        {isUpscalerConfigured && (
          <div className={cn('flex items-center gap-2 px-1')}>
            <span className="text-sm whitespace-nowrap">{t('gameBatchAdder.upscaleScale')}</span>
            <Select
              value={String(upscaleScale)}
              onValueChange={(val) => setUpscaleScale(Number(val))}
            >
              <SelectTrigger className="w-[100px] h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">{t('gameBatchAdder.noUpscale')}</SelectItem>
                <SelectItem value="2">2x</SelectItem>
                <SelectItem value="3">3x</SelectItem>
                <SelectItem value="4">4x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
