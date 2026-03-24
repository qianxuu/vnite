import { cn } from '~/utils'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { toast } from 'sonner'
import { useGameBatchAdderStore } from './store'
import { GameList } from './GameList'
import { useTranslation } from 'react-i18next'
import { UpscaleSelectField } from '~/components/utils/UpscaleSelect'

export function GameBatchAdder(): React.JSX.Element {
  const { t } = useTranslation('adder')
  const {
    isOpen,
    isLoading,
    upscaleScale,
    actions: { setIsOpen, setGames, setIsLoading, setUpscaleScale }
  } = useGameBatchAdderStore()

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
        <UpscaleSelectField
          className={cn('px-1')}
          value={upscaleScale}
          onValueChange={setUpscaleScale}
        />
      </DialogContent>
    </Dialog>
  )
}
