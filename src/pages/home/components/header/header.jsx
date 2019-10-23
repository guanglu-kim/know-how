import React from 'react'
import styles from './header.module.scss'
import { Icon } from 'office-ui-fabric-react/lib/Icon'

export default function Header() {
    return (
        <div className={styles.Header}>
            <div className={styles.content}>
                header
                <Logo className={styles.Logo}/>
            </div>
        </div>
    )

    function Logo(props) {
        return (
            <span {...props}>
               <Icon iconName="OfficeLogo"/>
            </span>
        )
    }
}
