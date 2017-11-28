package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.kony.ess.TstMessages;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_toastMsg extends JSLibrary {

 
 
	public static final String showToastMsg = "showToastMsg";
 
	String[] methods = { showToastMsg };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[0];
 return libs;
 }



	public N_toastMsg(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen != 2){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String param10 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 param10 = (java.lang.String)params[0];
 }
 Double param20 = null;
 if(params[1] != null && params[1] != LuaNil.nil) {
 param20 = (Double)params[1];
 }
 ret = this.showToastMsg( param10, param20 );
 
 			break;
 		default:
			break;
		}
 
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "toastMsg";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] showToastMsg( java.lang.String inputKey0, Double inputKey1 ){
 
		Object[] ret = null;
 com.kony.ess.TstMessages.showTstMessage( inputKey0
 , inputKey1.intValue() );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
};
