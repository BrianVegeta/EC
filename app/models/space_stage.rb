class SpaceStage < StageBase
 
  #CONSTANT VALUE
  KEY_OWNER_END = 'can_owner_end'
  KEY_LESSEE_END = 'can_lessee_end'
  
  def initialize(contractm, uid)
    super(contract, uid)
    modify_display_param(KEY_OWNER_END, false)     #賣家可以結束 (true = show, false = hidden)
    modify_display_param(KEY_LESSEE_END, false)    #買家可以結束 (true = show, false = hidden)
  end  

  ####################### ABSTRACT FUNCTION #######################################
  def process
    super 
    
    #ADDITIONAL PROCESS
    if self.stage_type == NORMAL_CONTRACT
      check_contract_end
    end
    
  end
  
  def prepare_normal_tab
    
  end
  
  protected
  
  ####################### BASE STAGE FUNCTION #####################################
  
  def check_contract_end

    if not (self.screen_type >= CONTRACT_START || self.screen_type <= RETURN_CONFIRM)
      return
    end
    
    modify_display_param(KEY_OWNER_END, (self.contract['owner_send_time'].nil?))
    modify_display_param(KEY_LESSEE_END, (self.contract['lessee_send_time'].nil?))
  end
end
