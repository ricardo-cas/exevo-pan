import clsx from 'clsx'

const ActiveCount = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'bg-battleYellow flex h-[17px] w-[17px] cursor-default items-center justify-center rounded-full text-[11px] text-black shadow-md transition-opacity',
      props['aria-hidden'] && 'opacity-0',
      className,
    )}
    {...props}
  />
)

export default ActiveCount
