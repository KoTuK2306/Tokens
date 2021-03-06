import { useState, FC } from 'react'
import { NavLink } from 'react-router-dom'
import { tokenIcons } from '../../../tokenIcons'
import { Token as TokenProps } from '../../../interfaces/Token'
import classes from './Token.module.css'

const userIcon = tokenIcons[0].icon
const chevron = tokenIcons[1].icon

const getClassOfColor = (number: number) => {
  if (number < 0) {
    return `${classes.red}`
  }
  if (number > 0) {
    return `${classes.green}`
  }
}

const addSymbolsToNumber = (number: number) => {
  if (number > 0) {
    return `+${number}%`
  }
  return `${number}%`
}

export const Token: FC<TokenProps> = ({ token }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <section className={classes.tokenWrapper}>
      <div className={classes.navlinkWrapper}>
        <NavLink to={`/token/${token.id}`} className={classes.token}>
          <p className={classes.id}>{`#${token.id}`}</p>
          <img className={classes.logo} src={token.logoURI} alt={token.name} />

          <div className={classes.nameWrapper}>
            <p className={classes.name}>{token.name}</p>
            <p className={classes.symbol}>{token.symbol}</p>
          </div>

          <div className={classes.priceWrapper}>
            <p className={classes.price}>{`${token.price} $`}</p>
            <div className={classes.priceChanges}>
              {Object.values(token.priceChange).map((priceChange, index) => (
                <p
                  key={index}
                  className={`${classes.priceChange} ${getClassOfColor(priceChange)}`}
                >
                  {addSymbolsToNumber(priceChange)}
                </p>
              ))}
            </div>
          </div>

          <div className={classes.volumeWrapper}>
            <p className={classes.volume}>{`${token.volume.toLocaleString('ru')}$`}</p>
            <p className={classes.percent}>{`${token.volumeChangePercentage}%`}</p>
          </div>

          <div className={classes.volumeWrapper}>
            <p className={classes.volume}>{`${token.tvl.toLocaleString('ru')}$`}</p>
            <p className={classes.percent}>{`${token.tvlChangePercentage}%`}</p>
          </div>

          <div className={classes.accountsWrapper}>
            <div className={classes.usersIcon}>{userIcon}</div>
            <p className={classes.usersNum}>{token.users.toLocaleString('ru')}</p>
          </div>
        </NavLink>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${classes.descriptionButton} ${
            isOpen ? classes.openedDescriptionButton : ''
          }`}
        >
          {chevron}
        </div>
      </div>
      <div className={`${classes.description} ${isOpen ? classes.open : ''}`}>
        {token.description}
      </div>
    </section>
  )
}
