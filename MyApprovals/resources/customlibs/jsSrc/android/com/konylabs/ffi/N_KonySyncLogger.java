package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.kony.sync.Logger.Core.KonySyncLogger;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_KonySyncLogger extends JSLibrary {

 
 
	public static final String setConfig = "setConfig";
 
 
	public static final String setLogLevel = "setLogLevel";
 
 
	public static final String addPersister = "addPersister";
 
 
	public static final String getLogLevel = "getLogLevel";
 
 
	public static final String logTrace = "logTrace";
 
 
	public static final String logDebug = "logDebug";
 
 
	public static final String logInfo = "logInfo";
 
 
	public static final String logWarning = "logWarning";
 
 
	public static final String logError = "logError";
 
 
	public static final String logFatal = "logFatal";
 
 
	public static final String flush = "flush";
 
	String[] methods = { setConfig, setLogLevel, addPersister, getLogLevel, logTrace, logDebug, logInfo, logWarning, logError, logFatal, flush };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[0];
 return libs;
 }



	public N_KonySyncLogger(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen != 2){ return new Object[] {new Double(100),"Invalid Params"}; }
 com.konylabs.vm.LuaTable loggerConfig0 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 loggerConfig0 = (com.konylabs.vm.LuaTable)params[0];
 }
 com.konylabs.vm.Function errorCallback0 = null;
 if(params[1] != null && params[1] != LuaNil.nil) {
 errorCallback0 = (com.konylabs.vm.Function)params[1];
 }
 ret = this.setConfig( loggerConfig0, errorCallback0 );
 
 			break;
 		case 1:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.Double logLevel1 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 logLevel1 = (java.lang.Double)params[0];
 }
 ret = this.setLogLevel( logLevel1 );
 
 			break;
 		case 2:
 if (paramLen != 2){ return new Object[] {new Double(100),"Invalid Params"}; }
 com.konylabs.vm.LuaTable persisterConfig2 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 persisterConfig2 = (com.konylabs.vm.LuaTable)params[0];
 }
 com.konylabs.vm.Function errorCallback2 = null;
 if(params[1] != null && params[1] != LuaNil.nil) {
 errorCallback2 = (com.konylabs.vm.Function)params[1];
 }
 ret = this.addPersister( persisterConfig2, errorCallback2 );
 
 			break;
 		case 3:
 if (paramLen != 0){ return new Object[] {new Double(100),"Invalid Params"}; }
 ret = this.getLogLevel( );
 
 			break;
 		case 4:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String statement4 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 statement4 = (java.lang.String)params[0];
 }
 ret = this.logTrace( statement4 );
 
 			break;
 		case 5:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String statement5 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 statement5 = (java.lang.String)params[0];
 }
 ret = this.logDebug( statement5 );
 
 			break;
 		case 6:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String statement6 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 statement6 = (java.lang.String)params[0];
 }
 ret = this.logInfo( statement6 );
 
 			break;
 		case 7:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String statement7 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 statement7 = (java.lang.String)params[0];
 }
 ret = this.logWarning( statement7 );
 
 			break;
 		case 8:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String statement8 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 statement8 = (java.lang.String)params[0];
 }
 ret = this.logError( statement8 );
 
 			break;
 		case 9:
 if (paramLen != 1){ return new Object[] {new Double(100),"Invalid Params"}; }
 java.lang.String statement9 = null;
 if(params[0] != null && params[0] != LuaNil.nil) {
 statement9 = (java.lang.String)params[0];
 }
 ret = this.logFatal( statement9 );
 
 			break;
 		case 10:
 if (paramLen != 0){ return new Object[] {new Double(100),"Invalid Params"}; }
 ret = this.flush( );
 
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
		return "KonySyncLogger";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] setConfig( com.konylabs.vm.LuaTable inputKey0, com.konylabs.vm.Function inputKey1 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.setConfig( (java.util.Hashtable)TableLib.convertToHash(inputKey0)
 , (com.konylabs.vm.Function)inputKey1
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] setLogLevel( java.lang.Double inputKey0 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.setLogLevel( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] addPersister( com.konylabs.vm.LuaTable inputKey0, com.konylabs.vm.Function inputKey1 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.addPersister( (java.util.Hashtable)TableLib.convertToHash(inputKey0)
 , (com.konylabs.vm.Function)inputKey1
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] getLogLevel( ){
 
		Object[] ret = null;
 Double val = new Double(com.kony.sync.Logger.Core.KonySyncLogger.getLogLevel( ));
 
 			ret = new Object[]{val, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] logTrace( java.lang.String inputKey0 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.logTrace( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] logDebug( java.lang.String inputKey0 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.logDebug( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] logInfo( java.lang.String inputKey0 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.logInfo( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] logWarning( java.lang.String inputKey0 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.logWarning( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] logError( java.lang.String inputKey0 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.logError( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] logFatal( java.lang.String inputKey0 ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.logFatal( inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] flush( ){
 
		Object[] ret = null;
 com.kony.sync.Logger.Core.KonySyncLogger.flush( );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
};
