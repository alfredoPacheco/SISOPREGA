package com.tramex.sisoprega.common.crud;

import com.tramex.sisoprega.common.BaseResponse;
import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;

public interface Cruddable {
	CreateGatewayResponse Create(GatewayRequest request);
	ReadGatewayResponse Read(GatewayRequest request);
	UpdateGatewayResponse Update(GatewayRequest request);
	BaseResponse Delete(GatewayRequest request);
}
