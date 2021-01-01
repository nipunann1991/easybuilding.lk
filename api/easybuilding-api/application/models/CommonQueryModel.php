<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');



 
class CommonQueryModel extends CI_Model{

    function __construct(){ 
        parent::__construct();
 
    }


    public function selectAllData($table){
 

        $select_query = "SELECT * FROM `$table`" ;
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{

			$x = json_decode(json_encode($query->result()), true);
  
			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);

			 

			return  $output;
		}

       
    }



 

    public function selectAllDataDT($table){

        $select_query = "SELECT * FROM `$table`" ;
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{
  
			$output = $query->result();
			return $output;
		}

       
    }



    function count_filtered($data)
    {
        $select_query = "select ".$data['columns']." FROM ".$data['table']." WHERE ".$data['data']."" ;
        $query = $this->db->query($select_query);  
 
        return $query->num_rows();
    }

    public function count_all($table)
    {
        $this->db->from($table);
        return $this->db->count_all_results();
    }


    public function selectCustomData($search_data){

    	$eq_table_col = '';

    	if ($search_data['eq_table_col'] != '') {
    		$eq_table_col = " AND ".$search_data['eq_table_col'];
    	}

        $select_query = "SELECT ".$search_data['columns']." FROM ".$search_data['table']." WHERE ".$search_data['data'].$eq_table_col."" ; 
       		 
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{

			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }


    public function checkRowData($search_data){

        $select_query = "SELECT ".$search_data['columns']." FROM ".$search_data['table']." WHERE ".$search_data['data']."  " ; 
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{

			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }


    public function selectCustomDataAlias($search_data){

        $select_query = "SELECT ".$search_data['columns']." FROM ".$search_data['table']." HAVING ".$search_data['data']."  " ;
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{

			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }



    public function selectCustomDataDT($search_data){

        $select_query = "SELECT ".$search_data['columns']." FROM ".$search_data['table']." WHERE ".$search_data['data']."  " ; 

        $query = $this->db->query($select_query); 
 
        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{

			$output = $query->result();
			return $output;
		}

       
    }


    

    public function getAutoIncrementID($table){

        $select_query = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = '".$table."' AND  TABLE_SCHEMA = '".$this->db->database."'" ;
 
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{

			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);

			return $output;
		}

       
    }

    public function selectLastIndex($search_index){

        $select_query = "SELECT `".$search_index['search_index']."` FROM `".$search_index['table']."` ORDER BY `".$search_index['search_index']."` DESC LIMIT 1 " ;
 
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{

			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }


    public function getTotalRows($search_index){
 
        $select_query = "SELECT ".$search_index['columns']." FROM ".$search_index['table']." WHERE ".$search_index['data']."" ;  

        $query = $this->db->query($select_query); 

        //print_r( $query->result() );

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{

			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }


    public function getSumOfColumn($search_index){
 
        $select_query = "SELECT SUM(".$search_index['column'].") as sum FROM ".$search_index['table']." WHERE ".$search_index['data']." " ;
 
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{
 
			return $query->result()[0]->sum;
		}

       
    }



    public function getTotalCount($search_index){
 
        $select_query = "SELECT COUNT(*) as count FROM ".$search_index['table']." WHERE ".$search_index['data'] ;
 
        $query = $this->db->query($select_query); 

        if (!$query) {

			return 'error';

		}else{
 			 
			return $query->result()[0]->count;
		}

       
    }






    public function insertData($insert_vals){ 

        $select_query =  "INSERT INTO ".$insert_vals['table']." (".$insert_vals['columns'].") VALUES (".$insert_vals['values'].")" ;
        $query = $this->db->query($select_query); 
        $insert_id = $this->db->insert_id();
 
        if (!$query) {

			$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else if( $insert_id == NULL ){ 

			$output = array(
				'status' => 404 , 
				'data' => 'No data entered'
			);

			return $output; 

		}else{ 

			$output = array(
				'status' => 200 , 
				'data' => (object) array('message' => 'Data inserted sucessfully', 'insertedId' => $insert_id )  
			);

			return $output; 
		}
    }
    
    public function deleteData($delete_val){

    	$select_query =  "DELETE FROM ".$delete_val['table']." WHERE ".$delete_val['data']."" ;
        $query = $this->db->query($select_query); 

        if (!$query) {

			$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{ 

			$output = array(
				'status' => 200 , 
				'data' => 'Success',
			);

			return $output; 
		}
     
    }

    public function updateData($update_val){
 
    	$select_query =  "UPDATE ".$update_val['table']." SET ".$update_val['values']." WHERE ".$update_val['data']."" ;

 
        $query = $this->db->query($select_query); 

        if (!$query) {

			$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{ 

			$output = array(
				'status' => 200 , 
				'data' => 'Success',
			);

			return $output; 
		}
     
    }



    public function getLastInvoices(){


    	$date_arr = array('x');
    	$invoice_data_arr = array('Invoices');
 

    	for ($i= -4; $i <= 0 ; $i++) { 
    		
    		$date_ = date('Y-m-d',strtotime("".$i." days"));

    		$select_query = "SELECT COUNT(*) as count FROM `invoice` WHERE invoice_date = '".$date_."' " ;
       		$query = $this->db->query($select_query); 
			
			array_push($date_arr, $date_);
			array_push($invoice_data_arr, $query->result()[0]->count);
 
    	}
 
    	$result = array('dates' => $date_arr, 'total_invoices' => $invoice_data_arr ); 

    	$output = array(
			'status' => 200 , 
			'data' => $result,
		);

		return $output; 
         




    }


 

    public function insertDataSP($table){



        //$select_query = "SELECT * FROM `$table`" ;+CALL `sp_login`(@p0);
        $select_query = " CALL `sp_login`(".$table['values'].")";
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{
  
			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }


    public function insertBulkStockSP($table){

 
        $select_query = " CALL `sp_insert_bulk_stock`(".$table['values'].")";
        $query = $this->db->query($select_query); 
 
        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{
  
			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }

    public function deletePackageItemsSP($table){

 
        $select_query = " CALL `archive_items_sp`(".$table['values'].")";
        $query = $this->db->query($select_query); 
 
        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{
  
			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }

    


    public function updateStockSP($table){

 
        $select_query = " CALL `sp_update_stock`(".$table['values'].")";
        $query = $this->db->query($select_query); 
 
        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{
  
			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }


    public function insertInvoiceSP($table){

 		print_r($table['values']);

        $select_query = " CALL `sp_addInvoice`(".$table['values'].")";
        $query = $this->db->query($select_query); 

        if (!$query) {

        	$output = array(
				'status' => 500 , 
				'data' => 'Query Error',
			);

			return $output;

		}else{
  
			$output = array(
				'status' => 200 , 
				'data' => $query->result(),
			);
			return $output;
		}

       
    }
 
 

}


