package com.tramex.sisoprega.common.crud;

import com.tramex.sisoprega.common.CreateGatewayResponse;
import com.tramex.sisoprega.common.GatewayRequest;
import com.tramex.sisoprega.common.ReadGatewayResponse;
import com.tramex.sisoprega.common.UpdateGatewayResponse;

public interface Cruddable {
	CreateGatewayResponse Create(GatewayRequest request);
	ReadGatewayResponse Read(GatewayRequest request);
	UpdateGatewayResponse Update(GatewayRequest request);
	com.tramex.sisoprega.common.Error Delete(GatewayRequest request);
}
