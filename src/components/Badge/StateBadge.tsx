import { StatusFarm } from "@/types/farm_model";
import { Badge, Row } from "antd";

export const FarmStateBadge = (value : StatusFarm) => {
    switch(value) {
        case StatusFarm.Actived:
            return (
                <span>
                    <Badge status="success" style={{paddingRight: '4px'}} />
                        Actived
                </span>
            );
        case StatusFarm.NotActive:
            return (
                <>
                    <Row style={{display: 'flex', alignItems: 'center'}}>
                        <Badge status="processing" color="yellow" style={{paddingRight: '4px'}} />
                        <div style={{fontSize: '16px', fontWeight: '500'}}>Not Actived</div>
                    </Row>
                </>
            );
        case StatusFarm.Revoked: 
            return (
                <span>
                    <Badge status="warning" color="red" style={{paddingRight: '4px'}} />
                    Revoked
                </span>
            ); 
        default:
            return (
                <span>
                    <Badge status="default" style={{paddingRight: '4px'}} />
                    Unknow
                </span>
            );   
    }
}