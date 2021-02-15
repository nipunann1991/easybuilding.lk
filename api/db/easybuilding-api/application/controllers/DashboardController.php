<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class DashboardController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	}
	 
	
 	public function getSummery(){ 

 		if (sizeof($this->isUserSessionValid()['data']) == 1) {

		 	$data["results"] = array(
				'total_profiles' => $this->getTotalProfileCount(),    
				'total_categories' => $this->getTotalCategoryCount(),    
				'total_project_images' => $this->getTotalProjectImagesCount(),     

				'company_vs_profile' =>  array(
					$this->getTotalProjectImagesCount() , 
					$this->getTotalProjectImagesCount() 
				)
			);


			$dataOutput = array( 
				'status' => 200, 
				'data' => $data["results"], 
			);

        	return $this->returnJSON($dataOutput); 

		}else{
			return $this->invalidSession(); 
		}

	}


	public function getCompanyVsProfile(){ 

 		if (sizeof($this->isUserSessionValid()['data']) == 1) {

		 	$data["results"] = array( 
				(int) $this->getTotalCompanyProfiles(), 
				(int) $this->getTotalPersonalProfiles()   
			);
 
			$dataOutput = array( 
				'status' => 200, 
				'data' => $data["results"], 
			);

        	return $this->returnJSON($dataOutput); 

		}else{
			return $this->invalidSession(); 
		}

	}

	

	public function getTotalProfileCount(){
		$search_index = array(  
			'table' => 'client_company',
			'data' => '1',
		);
  
		return $this->CommonQueryModel->getTotalCount($search_index);

	}

	public function getTotalCategoryCount(){
		$search_index = array(  
			'table' => '`categories-level2`',
			'data' => '1',
		);
  
		return $this->CommonQueryModel->getTotalCount($search_index);

	}


	public function getTotalProjectImagesCount(){
		
		$search_index = array(  
			'table' => 'project_images',
			'data' => '1',
		);
  
		return $this->CommonQueryModel->getTotalCount($search_index);

	}


	public function getTotalPersonalProfiles(){
		
		$search_index = array(  
			'table' => 'client_company',
			'data' => 'company_profile=0',
		);
  
		return $this->CommonQueryModel->getTotalCount($search_index);

	}


	public function getTotalCompanyProfiles(){
		
		$search_index = array(  
			'table' => 'client_company',
			'data' => 'company_profile=1',
		);
  
		return $this->CommonQueryModel->getTotalCount($search_index);

	}


	public function getTotalSignUps(){
		

		for ($k = 0; $k <= 8; $k++) {
 
	   		$months[] = date("Y-M", strtotime( date( 'Y-m' )." -$k months"));

	   		$search_date =  date("Y-m", strtotime( date( 'Y-m' )." -$k months"));

	   		$company[] = $this->getTotalCompanyProfilesByMonth($search_date, 0);
	   		$personal[] = $this->getTotalCompanyProfilesByMonth($search_date, 1);
					
			($company == null )? $company[] = 0 : "" ;
			($personal == null )? $personal[] = 0 : "" ;
			  
		}

		$data = array(
			'months' => array_reverse($months),
			'company_profiles' => $company,
			'personal_profiles' => $personal, 
		); 
 
		$dataOutput = array( 
			'status' => 200, 
			'data' => $data, 
		);

    	return $this->returnJSON($dataOutput);  

	}


	public function getTotalCompanyProfilesByMonth($created_date, $company ){
		
		$search_index = array(  
			'alias' => 'c',
			'table' => 'client_company cc, clients c',
			'data' => 'c.client_id=cc.client_id AND company_profile="'.$company.'" AND c.created_date BETWEEN "'.$created_date.'-01" AND "'.$created_date.'-31"',
		);
  
		return $this->CommonQueryModel->getTotalCount($search_index);

	}
	
	 
 
}
