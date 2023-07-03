import classes from './OrderStatus.module.css'
import OrderButton from '../../UI/OrderButton'

const OrderStatus = (props) => {
    return (
        <div className={classes['order-container']}>
            <OrderButton classes='order' content='접수대기' to='/today/order/wait' />
            <OrderButton classes='order' content='처리중' to='/today/order/process' />
            <OrderButton classes='order' content='완료' to='/today/order/complete' />
            <OrderButton classes='order' content='떨이 등록 / 수정' to='/today/menu' />
            <OrderButton classes='finish' content='영업 종료' onShowStore={props.onShowStore} />
        </div>
    )
}

export default OrderStatus;