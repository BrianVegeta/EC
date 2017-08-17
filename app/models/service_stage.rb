class ServiceStage < StageBase

  #CONSTANT VALUE
  KEY_OWNER_END = 'can_owner_end'
  KEY_LESSEE_END = 'can_lessee_end'

  def initialize(contract, uid)
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
    case self.screen_type
    when STAGE_WAITING_CONFIRM, STAGE_LAST_CHECK, STAGE_NEGOTIATING
      modify_display_param(KEY_TAB, TAB_REQUEST)
    when STAGE_LESSEE_PAY
      modify_display_param(KEY_TAB, TAB_PAY)
    when STAGE_SHIPPING, STAGE_SHIP_CONFIRM, STAGE_CONTRACT_ONGOING
      modify_display_param(KEY_TAB, TAB_WAITING_TO_GO)
    when STAGE_CONTRACT_START, STAGE_CONTRACT_END, STAGE_RETURN_CONFIRM
      modify_display_param(KEY_TAB, TAB_ONGOING)
    when STAGE_SCORE, STAGE_COMPLETE, STAGE_COMPLETE2
      modify_display_param(KEY_TAB, TAB_COMPLETE)
    end
  end

  protected

  ####################### BASE STAGE FUNCTION #####################################

  def check_contract_end

    if not (self.screen_type >= STAGE_CONTRACT_START && self.screen_type <= STAGE_RETURN_CONFIRM)
      return
    end

    modify_display_param(KEY_OWNER_END, (self.contract['owner_send_time'].nil?) && self.is_owner)

    modify_display_param(KEY_LESSEE_END, (self.contract['lessee_send_time'].nil?) && !self.is_owner)

  end


end
